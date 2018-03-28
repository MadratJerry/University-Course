#include <reg52.h>
// 预设参数
#define SCAN_DELAY 10000
#define UNIT_DELAY 500
// 宏循环
#define LOOP_0(f) f##(0)
#define LOOP_1(f) LOOP_0(f) f##(1)
#define LOOP_2(f) LOOP_1(f) f##(2)
#define LOOP_3(f) LOOP_2(f) f##(3)
#define LOOP_4(f) LOOP_3(f) f##(4)
#define LOOP_HELPER(n, f) LOOP_##n(f)
#define LOOP(n, f) LOOP_HELPER(n, f)
#define CMD(n, f) f##(n)
// 类型重命名
typedef bit bool;
typedef unsigned char uint8;
typedef signed char int8;
typedef unsigned int uint16;
typedef signed int int16;
// T2定时器
sfr T2MOD = 0xc9;
// 蜂鸣器
sbit BEEP = P2 ^ 4;
// 最大值与最小值
uint8 min(uint8 x, uint8 y) { return x < y ? x : y; }
uint8 max(uint8 x, uint8 y) { return x > y ? x : y; }
// 定义LED全局变量
#define MARCO_LED_DEFINE(n) sbit LED##n = P0 ^ ##n;
LOOP(4, MARCO_LED_DEFINE)
// LED控制(序号, 赋值)
#define MARCO_LED_F(n) if (e == n) return e, LED##n = s;
int8 LED(uint8 e, uint8 s) { LOOP(4, MARCO_LED_F) return -1; }
// 红外地址接口定义
sbit A0 = P1 ^ 2;
sbit A1 = P1 ^ 3;
sbit A2 = P1 ^ 4;
// 红外传感器接收信号口定义（接收--0 未接收--1）
sbit R0 = P2 ^ 5;
sbit R1 = P2 ^ 6;
sbit R2 = P2 ^ 7;
sbit R3 = P3 ^ 6;
sbit R4 = P3 ^ 7;
// 定义红外传感器检测状态全局位变量
#define MARCO_I_DEFINE(n) bit I##n = 0;
LOOP(4, MARCO_I_DEFINE)
// 障碍物检测(序号)
#define FO 0
#define RO 1
#define FR 2
#define LO 3
#define FL 4
uint8 IG(uint8 e) {
  if (e == FO) return I1;
  if (e == RO) return I4;
  if (e == LO) return I3;
  if (e == FR) return I2;
  if (e == FL) return I0;
  return 0;
}
// 红外接收控制(传入传感器组号)
#define MARCO_RG_F(n) if (e == n) return I##n = (R##n ? 0 : 1);
uint8 RG(uint8 e) { LOOP(4, MARCO_RG_F) return 1; }
// 红外发射控制(传入传感器组号)
void IR_ON(uint8 n) {
  A0 = n & 0x01, A1 = n & 0x02, A2 = n & 0x04;
  if (n == 5) A0 = A1 = A2 = 1;
}
// 红外接收扫描
void scan() interrupt 5 {
  static uint8 n = 0;
  TF2 = 0;
  (RG(n - 1)) ? LED(n - 1, 0) : LED(n - 1, 1);
  IR_ON(n);
  n = (n + 1) % 6;
}
// 定义电机引脚控制变量定义 0 1 左电机 2 3 右电机
#define MARCO_M_DEFINE(n) sbit M##n = P2 ^ ##n;
LOOP(3, MARCO_M_DEFINE)
// 电机脉冲记录
uint8 mL = 0, mR = 0;
void mCountL() interrupt 1 { mL++; }
void mCountR() interrupt 3 { mR++; }
// 电机引脚控制(序号, 赋值)
#define MARCO_M_F(n) if (e == n) M##n = s;
void M(uint8 e, uint8 s) { LOOP(3, MARCO_M_F) }
// 电机控制(控制代码)
void CM(uint8 c) {
  uint8 i;
  for (i = 0; i < 4; i++, c /= 2) M(i, c % 2);
}
// 移动控制(控制代码, 电机单个单元转动次数)
#define FORWARD 0xE7
#define RETREAT 0xDB
#define TURNRIGHT 0xEB
#define TURNLEFT 0xD7
void MOVE(uint8 c, uint8 lL, uint8 lR) {
  mL = mR = 0;
  do { mL < mR ? CM(c / 16) : CM(c % 16); } while (((mL < min(lL, lR)) || (mR < min(lL, lR))) && c);
  do { lL > lR ? CM(c / 16) : CM(c % 16); } while (((mL < max(lL, lR)) && (mR < max(lL, lR))) && c);
  CM(0xf);
}
// 延时(ms)  延时时间=[(2*R5+3)*R6+3]*R7+5
void delay_ms(uint16 ms) {
  uint8 i, j, k;
  while (ms--) for (i = 5; i > 0; i--) for (j = 4; j > 0; j--) for (k = 23; k > 0; k--);
}
//初始化定时器T2
void initT2(uint16 us) {
  TL2 = RCAP2L = (65536 - us) % 256;
  TH2 = RCAP2H = (65536 - us) / 256;
  EA = TR2 = ET2 = 1;
}
// 初始化定时器T0 T1(1单位所需脉冲数)
void initT0_1(uint8 u) {
  TMOD = 0x66;
  TH0 = TL0 = TH1 = TL1 = 256 - u;
  EA = ET0 = ET1 = TR0 = TR1 = 1;
}
// 吱一声(间隔毫秒数，次数)
void beep(uint16 ms, uint16 n) {
  for (n *= 2; n > 0; n--)
    BEEP = ~BEEP, delay_ms(ms);
}
// 小车单元行为(单元行为代码)
#define STRAIGHT 0
#define RIGHT 1
#define ROUND 2
#define LEFT 3
#define UNIT 15 //单位距离
#define TURN 20 //单位转向
void unit(uint8 u) {
  uint8 l = UNIT;
  delay_ms(UNIT_DELAY);
  if (u == 0)
    while (l--) {
      if (IG(FO)) break;
      MOVE(FORWARD, 3, 3);
      if (IG(FL) && !IG(FR)) MOVE(TURNRIGHT, 1, 0);
      if (!IG(FL) && IG(FR)) MOVE(TURNLEFT, 0, 1);
    }
  if (u == 1) MOVE(TURNRIGHT, TURN, TURN);
  if (u == 2) {
    MOVE(TURNLEFT, TURN * 2, TURN * 2);
    while (IG(FO)) MOVE(TURNLEFT, 1, 1);
  }
  if (u == 3) MOVE(TURNLEFT, TURN, TURN);
}
// 迷宫移动指令(指令代码)
#define N 0
#define E 1
#define S 2
#define W 3
#define MAZE_HEIGHT 8
#define MAZE_WIDTH 8
uint8 pdata map[MAZE_HEIGHT][MAZE_WIDTH] = {0}, step[MAZE_HEIGHT][MAZE_WIDTH] = {0};
void setStep(uint8 x, uint8 y, uint8 s) { step[x][y] = s; }
void msMOVE(int8 *x, int8 *y, int8 d, uint8 s) {
  *x -= (d - 1) % 2, *y -= (d - 2) % 2;
  if (*x >= 0 && *x < MAZE_HEIGHT && *y >= 0 && *y < MAZE_WIDTH && s > 0) setStep(*x, *y, s);
}
// 拆墙
void breakWall(uint8 x, uint8 y, uint8 d) { map[x][y] = (map[x][y] | (1 << d)); }
// 迷宫指令(迷宫方向，小车朝向)
void mazeOrder(int8 d, int8 *h) {
  beep(250, 1);
  unit((d - *h + 4) % 4);
  if ((d - *h + 4) % 4) unit(0);
  *h = d;
}
// 迷宫递归遍历函数(迷宫移动指令)
void maze(int8 o) compact reentrant {
  int8 i;
  static int8 h = 0, x = 0, y = 0, nx, ny, s = 1;
  msMOVE(&x, &y, o, ++s);
  mazeOrder(o, &h);
  for (i = 0; i < 3; i++) 
    if (!IG((i + 3) % 4))
      breakWall(x, y, ((i + h + 3) % 4));
  breakWall(x, y, (o + 2) % 4);
  for (i = 0; i < 4; i++) {
    nx = x, ny = y;
    msMOVE(&nx, &ny, i, 0);
    if (nx >= 0 && nx < MAZE_HEIGHT && ny >= 0 && ny < MAZE_WIDTH &&
        (map[x][y] & (1 << i)) && !step[nx][ny])
      maze(i);
  }
  beep(100, 2);
  mazeOrder((o + 2) % 4, &h);
  msMOVE(&x, &y, (o + 2) % 4, --s);
}
// 最佳路
void bestPath(int8 x, int8 y) compact reentrant {
  int8 i;
  static int8 nx, ny, h = 2;
  if (x == 0 && y == 0) return;
  for (i = 0; i < 4; i++) {
    nx = x, ny = y;
    msMOVE(&nx, &ny, i, 0);
    if (nx >= 0 && nx < MAZE_HEIGHT && ny >= 0 && ny < MAZE_WIDTH &&
        (map[x][y] & (1 << i)) && step[nx][ny] == step[x][y] - 1)
        break;
  }
  bestPath(nx, ny);
  mazeOrder((i+2) % 4, &h);
}
void main() {
  step[0][0] = 1;
  initT2(SCAN_DELAY);
  initT0_1(4);
  maze(N);
  bestPath(7, 7);
  while (1) P0 = 0;
}
