@echo off
C51 %1
del %~n1.LST
BL51 %~n1.OBJ TO %~n1.tmp
del %~n1.OBJ %~n1.M51
OH51 %~n1.tmp
del %~n1.tmp