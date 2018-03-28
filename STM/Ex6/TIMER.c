#include <reg52.h>
unsigned char code table[] = {0xc0, 0xf9, 0xa4, 0xb0, 0x99, 0x92, 0x82, 0xf8, 0x80, 0x90};
unsigned char ctrl[] = {0xf7, 0xfb, 0xfd, 0xfe};
unsigned int i = 0, j = 0, k, l, c = 1, b = 0xff;
void display(unsigned int i) {
    for (k = 0; k < 4; k++, i /= 10) {
        P0 = table[i%10]; P2 = ctrl[k] & b;
        for (l = 0; l <= 100; l++);
    }
}
void click() interrupt 0 {
    if (c) j = i = 0; 
    TR0 = ~TR0; c = !c;
}
void time() interrupt 1 {
    TH0 = 0x4C; TL0 = 0x00;
    if (i++ == 20) {j++; i = 0; b = 0xff;}
        
}
void main() {
    TMOD = 0x01;
    TH0 = 0x4C; TL0 = 0x00;
    EA = 1; ET0 = 1; EX0 = 1; IT0 = 1;
    while(1) { display(j % 100 == 60 ? j+= 40, b = 0xef: j);};
}
