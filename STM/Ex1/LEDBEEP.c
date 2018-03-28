#include<reg52.h>
sbit beep = P2^4;
void delay_100ms(unsigned);
void main(){
	int i;
    P0 = 0xff;
    for (i = 0; i < 3; i++) {
        P0 = 0xaa;
        delay_100ms(1);
        P0 = 0x55;
		beep = 0;
		delay_100ms(1);
        beep = 1;
	}
    P0 = 0;
    for (i = 0; i < 6; i++) {
        P0 = P0^0xff;
        delay_100ms(1);
    }
    P0 = 0xff;
    while(1);
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
