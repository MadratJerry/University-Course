package pers.crazymousethief.bigsort.distributed.proxy;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;

public class Proxy {
    private static final ArrayList<Socket> sockets = new ArrayList<>();

    public static void main(String[] args) throws IOException {
        new Thread(() -> {
            try (var server = new ServerSocket(17325)) {
                while (true) {
                    Socket socket = server.accept();
                    sockets.add(socket);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();

        var reader = new BufferedReader(new InputStreamReader(System.in));
        while (true) {
            printf("> ");
            var orders = reader.readLine().split(" ");
            switch (orders[0]) {
                case "ls":
                    sockets.removeIf((socket) -> {
                        try {
                            socket.sendUrgentData(0xFF);
                        } catch (Exception e) {
                            return true;
                        }
                        return false;
                    });
                    for (var i = 0; i < sockets.size(); i++) {
                        printfln("%d %s", i, sockets.get(i).getRemoteSocketAddress());
                    }
                    break;
                case "put":
                    if (orders.length != 3) {
                        printfln("Unexpected arguments");
                    } else {
                        var fileName = orders[1];
                        var socket = sockets.get(Integer.parseInt(orders[2]));
                        new Thread(() -> {
                            try {
                                var input = new BufferedInputStream(new FileInputStream(fileName));
                                var output = new BufferedOutputStream(socket.getOutputStream());
                                byte[] buffer = new byte[1024];
                                int length;
                                while ((length = input.read(buffer)) != -1) {
                                    output.write(buffer, 0, length);
                                }
                                output.flush();
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }).start();
                    }
                    break;
                default:
                    printfln("Unknown command");
                    break;
            }
        }
    }

    private static void printf(String order, Object... args) {
        System.out.printf(order, args);
    }

    private static void printfln(String order, Object... args) {
        printf(order.concat("\n"), args);
    }
}
