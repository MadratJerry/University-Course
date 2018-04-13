package pers.crazymousethief.bigsort.distributed.proxy;

import pers.crazymousethief.bigsort.distributed.SocketBlock;
import pers.crazymousethief.bigsort.distributed.node.NodeBlock;

import java.io.*;
import java.net.ServerSocket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Proxy {
    private static final ArrayList<SocketBlock> socketBlocks = new ArrayList<>();
    private static final Map<SocketBlock, NodeBlock> socketBlockMap = new HashMap<>();

    public static void main(String[] args) throws IOException {
        new Thread(() -> {
            try (var server = new ServerSocket(17325)) {
                while (true) {
                    SocketBlock socketBlock = new SocketBlock(server.accept());
                    socketBlocks.add(socketBlock);
                    socketBlockMap.put(socketBlock, new NodeBlock());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();

        command();
    }

    private static void command() throws IOException {
        var reader = new BufferedReader(new InputStreamReader(System.in));
        while (true) {
            printf("> ");
            var orders = reader.readLine().split(" ");
            switch (orders[0]) {
                case "":
                    break;
                case "ls":
                    socketBlocks.removeIf((socket) -> {
                        try {
                            socket.getSocket().sendUrgentData(0xFF);
                        } catch (Exception e) {
                            socketBlockMap.remove(socket);
                            return true;
                        }
                        return false;
                    });
                    for (var i = 0; i < socketBlocks.size(); i++) {
                        var socketBlock = socketBlocks.get(i);
                        try {
                            var writer = socketBlock.getOutputStreamWriter();
                            writer.write("STATE\n");
                            writer.flush();
                            socketBlockMap.replace(socketBlock, (NodeBlock) socketBlock.getObjectInputStream().readObject());
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        printfln("%d %s %s", i, socketBlock.getSocket().getRemoteSocketAddress(), socketBlockMap.get(socketBlock).getState());
                    }
                    break;
                case "put":
                    if (orders.length != 3) {
                        printfln("Unexpected arguments");
                    } else {
                        var fileName = orders[1];
                        var socketBlock = socketBlocks.get(Integer.parseInt(orders[2]));
                        new Thread(() -> {
                            try {
                                var input = new BufferedInputStream(new FileInputStream(fileName));
                                var output = new BufferedOutputStream(socketBlock.getOutputStream());
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
