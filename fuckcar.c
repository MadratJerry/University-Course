#include <reg52.h>

// 预设参数
#define SCAN_DELAY 10000
#define FORWARD 0xE7
#define RETREAT 0xDB
#define TURNRIGHT 0xEB
#define TURNLEFT 0xD7

// 宏循环
#define LOOP_0(f) f##(0)
#define LOOP_1(f) LOOP_0(f) f##(1)
#define LOOP_2(f) LOOP_1(f) f##(2)
#define LOOP_3(f) LOOP_2(f) f##(3)
#define LOOP_4(f) LOOP_3(f) f##(4)
#define LOOP_HELPER(n, f) LOOP_##n(f)
#define LOOP(n, f) LOOP_HELPER(n, f)
#define CMD(n, f) f##(n)

// 宏展开
#define MARCO_RG_F(n) if (e==n) return I##n=(R##n?0:1);
#define MARCO_LED_F(n) if (e==n) return LED##n = s;
#define MARCO_M_F(n) if (e==n) M##n = s;
#define MARCO_LED_DEFINE(n) sbit LED##n = P0^##n;
#define MARCO_I_DEFINE(n) bit I##n = 0;
#define MARCO_M_DEFINE(n) sbit M##n = P2^##n;

// 类型重命名
typedef bit bool;
typedef unsigned char uint8;
typedef signed char int8;
typedef unsigned int uint16;
typedef signed int int16;

// T2定时器
sfr T2MOD=0xc9;

uint8 min(uint8 x, uint8 y) { return x<y?x:y; }
uint8 max(uint8 x, uint8 y) { return x>y?x:y; }
// 定义LED全局变量
LOOP(4, MARCO_LED_DEFINE)
// LED控制(序号, 赋值)
uint8 LED(uint8 e, uint8 s) { LOOP(4, MARCO_LED_F) return -1;}

// 红外地址接口定义
sbit A0 = P1^2;
sbit A1 = P1^3;
sbit A2 = P1^4;
// 红外传感器接收信号口定义（接收--0 未接收--1）
sbit R0 = P2^5;
sbit R1 = P2^6;
sbit R2 = P2^7;
sbit R3 = P3^6;
sbit R4 = P3^7;
// 定义红外传感器检测状态全局位变量
LOOP(4, MARCO_I_DEFINE)
// 红外接收控制(传入传感器组号)
uint8 RG(uint8 e) { LOOP(4, MARCO_RG_F) }
// 红外发射控制(传入传感器组号)
void IR_ON(uint8 n) { 
    A0 = (n)&0x01, A1 = (n)&0x02, A2 = (n)&0x04;
    if ((n)==5) A0=A1=A2=1;
}
// 红外接收扫描
void scan() interrupt 5 {
    static uint8 n = 0;
    TF2 = 0;
    (RG(n-1))?LED(n-1, 0):LED(n-1, 1);
    IR_ON(n);
    n = (n+1)%6;
}
// 定义电机引脚控制变量定义 0 1 左电机 2 3 右电机
LOOP(3, MARCO_M_DEFINE)
// 电机脉冲记录
uint8 mL = 0, mR = 0;
void mCountL() interrupt 1 { mL++; }
void mCountR() interrupt 3 { mR++; }
// 电机引脚控制(序号, 赋值)
void M(uint8 e, uint8 s) { LOOP(3, MARCO_M_F) }
// 电机控制(控制代码)
void CM(uint8 c) { uint8 i; for (i = 0; i < 4; i++, c /= 2) M(i, c%2); }
// 移动控制(控制代码, 电机单个单元转动次数)
void MOVE(uint8 c, uint8 lL, uint8 lR) {
    mL = mR = 0;
    do{ mL<mR?CM(c/16):CM(c%16); } while (((mL < min(lL, lR)) || (mR < min(lL, lR)))&&c);
    do{ lL>lR?CM(c/16):CM(c%16); } while (((mL < max(lL, lR)) && (mR < max(lL, lR)))&&c);
}

//初始化定时器T2
void initT2(uint16 us) {
	EA=1;
	TL2=RCAP2L=(65536-us)%256;
	TH2=RCAP2H=(65536-us)/256;
	TR2=ET2=1;
}
int8 SHIT = -1;
//初始化定时器T0 T1
void initT0_1(uint8 l, uint8 r) {
    TMOD = 0x66;
    TH0 = TL0 = 256 - l;
    TH1 = TL1 = 256 - r;
    EA = ET0 = ET1 = 1;
    TR0 = TR1 = 1;
}
void straight(uint8 l) {
    while (l--) {
        if (I1) break;
        MOVE(FORWARD, 5, 5);
        while (I0 || I2) {
            if (I0 && !I2) MOVE(FORWARD, 1, 0);
            if (!I0 && I2) MOVE(FORWARD, 0, 1);
        }
    }
}
void main() {
    uint16 a = 0;
	initT2(SCAN_DELAY);
    initT0_1(4, 4);
	while(1) {
        if (I1) {
            if (I3&&I4) SHIT = 0;
            else SHIT = 3;
            break;
            }
        if (!I3&&I4) {SHIT = 1;}
        if (I3&&!I4 || !I1&&!I3&&!I4) {SHIT = 2;}

        switch(SHIT) {
            case 0: {
                while (I1) { MOVE(TURNLEFT, 1, 1); }
                break;
            }
            case 1: {
                MOVE(TURNLEFT, 25, 25);
                break;
            }
            case 2: {
                MOVE(TURNRIGHT, 25, 25);
                break;
            }
            case 3: {
                // MOVE(RETREAT, 1, 1);
            }
            default: {
                straight(10);
            }
        }
        MOVE(0, 0, 0);
        for (a = 0; a < 50000; a++);
        SHIT = -1;
    }
}