#include <reg52.h>
sbit P3_5 = P3^5;
sbit beep = P2^4;
char i = 1, j;
int k = 0;
void main() {
        TMOD = 0x6;
        TH0 = 0xff; TL0 = 0xff;
        EA = 1; ET0 = 1; TR0 = 1;
        while(1);
}
void time1_int(void) interrupt 1 {
        TR0 = 0; i++;
        if (i == 6) i -= 5;
        j = i;
        while(j--) { 
            P0 = 0x00; beep = 0;
            for (k = 0; k < 30000; k++);
            beep = 1; P0 = 0xff;
            for (k = 0; k < 30000; k++);
        }
        TR0 = 1;
}
