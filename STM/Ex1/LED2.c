#include <reg52.h>
void delay_100ms(unsigned);
void main() {
    P0 = 0xfe;
    delay_100ms(5);
    P0 = 0xfa;
    delay_100ms(5);
    P0 = 0xea;
    delay_100ms(5);
    P0 = 0xaa;
    delay_100ms(5);
    P0 = 0xa8;
    delay_100ms(5);
    P0 = 0xa0;
    delay_100ms(5);
    P0 = 0x80;
    delay_100ms(5);
    P0 = 0x55;
    delay_100ms(5);
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
