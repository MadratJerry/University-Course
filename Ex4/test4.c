#include <reg52.h>
sbit Beep=P2^4;	    // 蜂鸣器
uchar ; moment=0,count=0,num=0,i;		//moment--秒数 count--时间计数 num--产生下降沿次数
void delay(int time)
{
	unsigned int i;
	for(i=0;i<time;i++)
	{}
}
void INT_0(void)	interrupt 0	//外部中断0
{	
	TR0=1; // 启动定时器T0
	num++;	
}
void T_0(void)	interrupt 1	//定时器T0中断
{
	TH0=0x4C;
	TL0=0;
	count++;
}
void main()
{
	TMOD=0x01;	//定时器模式
	P0=0xff;
	Beep=1;

	TH0=0x4c;
	TL0=0x00;	 //50ms

	EA=1; // 开总中断
	ET0=1; // T0 中断
	EX0=1; // INT0 中断
	IT0=1; // 边沿触发方式
	TR0=1; // 启动定时器T0

	while(1)
	{
		if(count==20)	//count==20 1秒
		{	
			
			if(num%2==0)
				moment++;
	
			if(count==60)
			{
				Beep=0;
				delay(500);
				Beep=1;
			}

			P0=~moment;	   //流水灯赋值
			count=0;
		}
	}	
}