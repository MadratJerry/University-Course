#include <reg52.h>
void delay_100ms(unsigned);
void main() {
    int i, j = 0x200;
    P0 = 0xff;
    while (1) {
        j = !(j>>9)+1;
        for (i = 0; i < 4; i++) {
            P0 = P0^j;
            delay_100ms(5);
            j = j<<2;
        }
        if (j == 0x200) P0 = 0xff;
    }
}
void delay_100ms(unsigned i) {
    unsigned num = 0;
    TMOD = 0x02;
    TH0 = 0x70;
    TL0 = 0x70;
    TR0 = 1;
    for (;;) {
        if (TF0) {
            TF0 = 0;
            num++;
        }
        if (num == 640*i) return;
    }
}