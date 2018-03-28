#include <reg52.h>
unsigned int f=0, count=0, s = 20, t;
unsigned char fluent;
sbit beep = P2^4;
void main() {	 
	TMOD=0x21;	  //选择8位T1计数器模式和16位T0定时器模式
	SCON=0x50;	  //SM0=0;SM1=1;RREN=1;8位异步通信方式
	TH1=0xfd; TL1=0xfd;
	TR1=1; TR0=1;
	TH0=0x4C; TL0=0x00;	  
	EA=1;		   //打开中断允许总控位
	ES=1;		   //打开串行口中断允许位
	ET0=1;		   //打开T0中断口
	PS=1;		   //打开串行口中断优先级控制位
	while(1);
}
void timer() interrupt 1 {
	TH0=0x4c;				  //手动人工赋初值
	TL0=0x00;				
	if(count++>=s) {count=0; P0=~P0;}
}
void SerialCom() interrupt 4 {
	RI=0;
    t = SBUF;
	if(t == 1) beep = 0;
	if(t == 2) s-=1;
	if(t == 3) {
        ES = 0;
        SBUF=1/(0.05*s);
        while (!TI);
        TI = 0;
        ES = 1;
    }
    if (s <= 1) s = 1;
}


