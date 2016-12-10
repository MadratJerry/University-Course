#include <reg52.h>
unsigned char code table[] = {0xc0, 0xf9, 0xa4, 0xb0, 0x99, 0x92, 0x82, 0xf8, 0x80, 0x90};
unsigned char ctrl[] = {0xf7, 0xfb, 0xfd, 0xfe};
int i0 = 0, i1 = 0, k, l, t = 0, b = 1, s = 20;
void display(unsigned int i) {
    i = i/60*100 + i%60;
    for (k = 0; k < 4; k++, i /= 10) {
        P0 = i0%s > s/2 && k/2 == b ? 0xff : table[i%10]; P2 = ctrl[k];
        for (l = 0; l <= 50; l++);
    }
}
void f() { i0 = 0; display(t < 0 ? t += b ? 60 : 1 : t); }
void INT() interrupt 0 { TR1 = 0, TR0 = 1; }
void time0() interrupt 1 {
    if (i0++ == 200 && t != 0) TR1 = 1, TR0 = 0, i0 = 0;
    TH0 = 0x4c; TL0 = 0x00;
}
void time1() interrupt 3 {
    if (i1++ == 20) {i1 = 0; if (!t--) TR1 = 0, TR0 = 1, t = 0;}
    TH1 = 0x4c; TL1 = 0x00;
}
void main() {
    TMOD = 0x11;
    TH0 = TH1 = 0x4c; TL0 = TL1 = 0x00;
    EA = ET0 = ET1 = EX0 = 1;
    while(1){
        display(t);
        if (T0 == 0 && TR1 == 0) {t += b ? 60 : 1; while(T0==0)f();}
        if (T1 == 0 && TR1 == 0) {t -= b ? 60 : 1; while(T1==0)f();}
        if (INT0 == 0) {b = !b; while(INT0==0)f();}
    }
}
