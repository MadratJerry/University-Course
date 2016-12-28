#include <reg52.h>

// 预设参数
#define SCAN_DELAY 10000
#define UNIT_DELAY 50000

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
int8 abs(int8 x) { return x < 0 ? -x : x; }

// 定义LED全局变量
#define MARCO_LED_DEFINE(n) sbit LED##n = P0 ^ ##n;
LOOP(4, MARCO_LED_DEFINE)
// LED控制(序号, 赋值)
#define MARCO_LED_F(n)                                                         \
  if (e == n)                                                                  \
    return LED##n = s;
uint8 LED(uint8 e, uint8 s) { LOOP(4, MARCO_LED_F) return -1; }

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
// 红外接收控制(传入传感器组号)
#define MARCO_RG_F(n)                                                          \
  if (e == n)                                                                  \
    return I##n = (R##n ? 0 : 1);
uint8 RG(uint8 e) { LOOP(4, MARCO_RG_F) return 1; }
// 红外发射控制(传入传感器组号)
void IR_ON(uint8 n) {
  A0 = (n)&0x01, A1 = (n)&0x02, A2 = (n)&0x04;
  if ((n) == 5)
    A0 = A1 = A2 = 1;
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
#define MARCO_M_F(n)                                                           \
  if (e == n)                                                                  \
    M##n = s;
void M(uint8 e, uint8 s) { LOOP(3, MARCO_M_F) }
// 电机控制(控制代码)
void CM(uint8 c) {
  uint8 i;
  for (i = 0; i < 4; i++, c /= 2)
    M(i, c % 2);
}
// 移动控制(控制代码, 电机单个单元转动次数)
#define FORWARD 0xE7
#define RETREAT 0xDB
#define TURNRIGHT 0xEB
#define TURNLEFT 0xD7
void MOVE(uint8 c, uint8 lL, uint8 lR) {
  mL = mR = 0;
  do {
    mL < mR ? CM(c / 16) : CM(c % 16);
  } while (((mL < min(lL, lR)) || (mR < min(lL, lR))) && c);
  do {
    lL > lR ? CM(c / 16) : CM(c % 16);
  } while (((mL < max(lL, lR)) && (mR < max(lL, lR))) && c);
  CM(0xf);
}

//初始化定时器T2
void initT2(uint16 us) {
  EA = 1;
  TL2 = RCAP2L = (65536 - us) % 256;
  TH2 = RCAP2H = (65536 - us) / 256;
  TR2 = ET2 = 1;
}
// 初始化定时器T0 T1
void initT0_1(uint8 l, uint8 r) {
  TMOD = 0x66;
  TH0 = TL0 = 256 - l;
  TH1 = TL1 = 256 - r;
  EA = ET0 = ET1 = 1;
  TR0 = TR1 = 1;
}
// 吱一声
void beep() {
  uint16 i;
  BEEP = 0;
  for (i = 0; i < 30000; i++)
    ;
  BEEP = 1;
}

// 小车前进(距离)
void _straight(uint8 l) {
  while (l--) {
    if (I1)
      break;
    MOVE(FORWARD, 5, 5);
    while (I0 || I2) {
      if (I0 && !I2)
        MOVE(FORWARD, 1, 0);
      if (!I0 && I2)
        MOVE(FORWARD, 0, 1);
    }
  }
}

// 小车单元行为(单元行为代码)
#define STRAIGHT 0
#define RIGHT 1
#define ROUND 2
#define LEFT 3
void unit(uint8 u) {
  uint16 a = 0;
  for (a = 0; a < UNIT_DELAY; a++)
    ;
  if (u == 0)
    _straight(10);
  if (u == 1) {
    MOVE(TURNRIGHT, 25, 25);
  }
  if (u == 2) {
    MOVE(TURNLEFT, 50, 50);
    while (I1) {
      MOVE(TURNLEFT, 1, 1);
    }
  }
  if (u == 3) {
    MOVE(TURNLEFT, 25, 25);
  }
}

// 迷宫移动指令(指令代码)
#define N (1 << 0)
#define E (1 << 1)
#define S (1 << 2)
#define W (1 << 3)
#define MAZE_HEIGHT 8
#define MAZE_WIDTH 8
uint8 map[MAZE_HEIGHT][MAZE_WIDTH] = {0};
uint8 code turn[4] = {E, S, W, N};
void setStep(uint8 x, uint8 y, uint8 s) { map[x][y] = (map[x][y] & 0xf0) + s; }
void msMOVE(uint8 *x, uint8 *y, uint8 d, uint8 s) {
  if (d == N)
    (*x)++;
  if (d == E)
    (*y)++;
  if (d == S)
    (*x)--;
  if (d == W)
    (*y)--;
  setStep(*x, *y, s);
}
// 拆墙
void breakWall(uint8 x, uint8 y, uint8 d) {
  map[x][y] = (map[x][y] & 0xf0 | (d << 4));
}
int getIndex(uint8 u) {
  int8 d = 0;
  for (d = 0; d < 4; d++)
    if (turn[d] == u)
      break;
  return (d + 1) % 4;
}
void mazeOrder(uint8 u, int8 *h) {
  int8 d = getIndex(u);
  if (abs(d - *h) == 2) {
    beep();
    unit(ROUND);
  }
  if (abs(d - *h) == 1) {
    unit(RIGHT);
  }
  if (abs(d - *h) == 3) {
    unit(LEFT);
  }
  unit(STRAIGHT);
  *h = d;
}
// 迷宫递归遍历函数(迷宫移动指令)
int8 maze(uint8 o) {
  static int8 h = 0;
  static uint8 x = 0, y = 0, nx, ny, d, s = 0, i;
  s++;
  mazeOrder(o, &h);
  msMOVE(&x, &y, o, s);
  if (!I3)
    breakWall(x, y, turn[(1 + h + 3) % 4]);
  if (!I1)
    breakWall(x, y, turn[(0 + h + 3) % 4]);
  if (!I4)
    breakWall(x, y, turn[(3 + h + 3) % 4]);
  for (i = 0; i < 4; i++) {
    nx = x, ny = y;
    msMOVE(&nx, &ny, o, 0);
    if ((map[x][y] & (turn[i] << 4)) && !(map[nx][ny] & 0x0f)) {
      maze(turn[i]);
    }
  }
  mazeOrder(turn[(getIndex(o) + 1) % 4], &h);
  s--;
}
void main() {
  initT2(SCAN_DELAY);
  initT0_1(4, 4);
  maze(N);
  while (1)
    ;
}