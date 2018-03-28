#include <reg52.h>
sbit up = P3^5;
sbit down = P3^4;
int s = 1;
void delay_100ms(unsigned, void (*)(void));
void UD();
void main() {
    P0 = 0x00;
    while (1) {
        delay_100ms(s, UD);
        P0 = ~P0;
    }
}
void UD() {
    if (up == 0 && s != 1) {
        while (1) {if (up == 1) break;}
        s--;
    }
    if (down == 0 && s != 10) {
        while (1) {if (down == 1) break;}        
        s++;
    }
}
void delay_100ms(unsigned i, void (*f)(void)) {
    unsigned num = 0;
    TMOD = 0x02;
    TH0 = 0x70;
    TL0 = 0x70;
    TR0 = 1;
    for (;;) {
        f();
        if (TF0) {
            TF0 = 0;
            num++;
        }
        if (num == 640*i) return;
    }
}
