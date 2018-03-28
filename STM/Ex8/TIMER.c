#include <reg52.h>
unsigned char code table[] = {0xc0, 0xf9, 0xa4, 0xb0, 0x99, 0x92, 0x82, 0xf8, 0x80, 0x90};
unsigned char ctrl[] = {0xf7, 0xfb, 0xfd, 0xfe};
unsigned int i0 = 0, i1 = 0, k, l, t = 0, b = 0, s = 20, btn, c = 0;
void display(unsigned int i) {
    i = i/60*100 + i%60;
    for (k = 0; k < 4; k++, i /= 10) {
        P0 = !c && i0%s > s/2 && k == b ? 0xff : table[i%10]; P2 = ctrl[k];
        for (l = 0; l <= 50; l++);
    }
}
int keyscan() {
    int t1, t2;
    P1 = 0xF0; t1 = ((~P1 >> 4) & 0x0f)/2 + (P1==0x70?0:1);
    P1 = ~P1; t2 = 4*((~P1 & 0x0f)/2 + (P1==0x07?-1:0));
    return P1==0x0f?0:t1 + t2; 
}
void time0() interrupt 1 {
    if (++i0 == 20) {i0 = 0; t += c ? 1 : 0;}
    TH0 = 0x4c; TL0 = 0x00;
}
void setT(int e) {
    int nt = t;     
    if (e > 6 && b == 1) return;
    if (b > 1) nt /= 60; else nt %= 60;
    if (b % 2) nt /= 10; else nt %= 10;
    t += (e-1-nt)*(b>1?60:1)*(b%2?10:1); 
}
void main() {
    TMOD = 0x01;
    TH0 = 0x4c; TL0 = 0x00;
    EA = ET0 = EX0 = 1;
    TR0 = 1;
    while (1) {
        display(t);
        btn = keyscan();
        if (btn == 16) c = !c; 
        else if (btn == 15) b++; 
        else if (btn == 14) b--;
        else if (btn >= 1 && btn <= 10) setT(btn);
        b %= 4;
        while (keyscan() != 0){display(t);};
    }
}