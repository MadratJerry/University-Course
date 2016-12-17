#include <reg52.h>
sfr T2MOD=0xc9;

//指示灯接口定义
sbit led0 = P0^0;
sbit led1 = P0^1;
sbit led2 = P0^2;
sbit led3 = P0^3;
sbit led4 = P0^4;

//红外地址接口定义
sbit A0 = P1^2;
sbit A1 = P1^3;
sbit A2 = P1^4;

//红外传感器接收信号口定义（接收--0 未接收--1）
sbit irR1 = P3^6;	//左
sbit irR2 = P2^5;	//左前
sbit irR3 = P2^6;	//中
sbit irR4 = P2^7;	//右前
sbit irR5 = P3^7;	//右

//定义红外传感器检测状态全局位变量 （L--Left R--Right C--Center LU--左前方 RU--右前方）
bit irL = 0,irR = 0,irC = 0,irLU = 0,irRU = 0;

//定义电机引脚控制变量 	ML左电机  MR右电机
sbit ML1=P2^0;
sbit ML2=P2^1;
sbit MR1=P2^2;
sbit MR2=P2^3;

//设置变量记录左右电机产生的脉冲数
unsigned char intCountL=0,intCountR=0;
unsigned int i, j, k;	  

//红外发射控制宏定义(传入传感器组号)
#define MOUSE_IR_ON(GROUP_NO)\
do\
{ \
   A0 = (GROUP_NO)&0x01;\
   A0 = (GROUP_NO)&0x02;\
   A0 = (GROUP_NO)&0x04;\
}while(0)

//初始化定时器T2
void initT_2(unsigned int us)
{
	EA=1;
	T2MOD=0;
	TCON=0;
	TL2=RCAP2L=(65536-us)/256; //500ms
	TH2=RCAP2H=(65536-us)%256;
	TR2=ET2=1;
}
void runML(bit f) {
    if (f) {
        ML1 = 1; ML2 = 0;
    } else {
        ML1 = 0; ML2 = 1;
    }
}
void runMR(bit f) {
    if (f) {
        MR1 = 1; MR2 = 0;
    } else {
        MR1 = 0; MR2 = 1;
    }
}
void stopMR() { MR1 = MR2 = 1; }
void stopML() { ML1 = ML2 = 1; }
void go() {
    unsigned int l = 50;
    for (i = 0, j = 0; i < l; i++, j++) {
        runMR(1);
        if (j < 39) {
            runML(0);
        } else stopML();
    }
}
void turn() {
    stopMR();
    for (i = 0; i < 50; i++) runML(0);
}
void main()
{
	initT_2(500);	//5000代表间隔时间
	while(1){
        for (k = 0; k < 3000; k++) go();
        for (k = 0; k < 500; k++) turn();
        
    };
}
void T_1() interrupt 3
{
	intCountR++;
}
//T2中断服务函数
void T_2() interrupt 5	
{
	static unsigned char irNo=1;  	//判断量
	TF2=0;	//T2定时器人为清零
	switch(irNo)
	{
		case 1 :{
			A0 = 0; A1 = 0; A2 = 0;	  //第一个信号灯(左前)
			break; 	
		}

		case 2 :{	
			if(irR1 == 1)  //红外传感器接收信号定义 ，接收--0，未接收--1  判断case1信是否接收到
			{
				irL=0;	  //左灯
				led0=1;
			}
			else
			{
				irL=1;
				led0=0;
			}

			A0 = 1; A1 = 0; A2 = 0;	 //第二个信号灯
			break;
		 }

		case 3 : {
			if(irR2 == 1)  //红外传感器接收信号定义 ，接收--0，未接收--1  判断case2信是否接收到
			{
				irLU=0;	  //左前灯
				led1=1;
			}
			else
			{
				irLU=1;
				led1=0;
			}

			A0 = 0; A1 = 1; A2 = 0;	 //第三个信号灯	   
			break;
		}

		case 4 : {
			if(irR3 == 1)  //红外传感器接收信号定义 ，接收--0，未接收--1  判断case3信是否接收到
			{
				irC=0;	  //中灯
				led2=1;
			}
			else
			{
				irC=1;
				led2=0;
			}

			A0 = 1; A1 = 1; A2 = 0;	 //第四个信号灯	   
			break;
		}

		case 5 : {
			if(irR4 == 1)  //红外传感器接收信号定义 ，接收--0，未接收--1  判断case4信是否接收到
			{
				irRU=0;	  //右前灯
				led3=1;
			}
			else
			{
				irRU=1;
				led3=0;
			}

			A0 = 0; A1 = 0; A2 = 1;	 //第五个信号灯	   
			break;
		}
		case 6 : {
			if(irR5 == 1)  //红外传感器接收信号定义 ，接收--0，未接收--1  判断case4信是否接收到
			{
				irR=0;	  //右灯
				led4=1;
			}
			else
			{
				irR=1;	  //右灯
				led4=0;
			}

			A0 = 1; A1 = 1; A2 = 1;	 //关闭信号灯   
			break;
		}
		//***
		//***
		//***同理
	}
	if(irNo<6)  irNo++;
	else	irNo = 1;
}