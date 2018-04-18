package pers.crazymousethief.bigsort.distributed.proxy;

import pers.crazymousethief.bigsort.distributed.SocketBlock;
import pers.crazymousethief.bigsort.distributed.node.NodeBlock;
import pers.crazymousethief.bigsort.io.util.Helper;

import java.io.*;
import java.net.ServerSocket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Proxy {
    private static final ArrayList<SocketBlock> socketBlocks = new ArrayList<>();
    private static final Map<SocketBlock, NodeBlock> socketBlockMap = new HashMap<>();
    private static boolean isSending = false;

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

        var reader = new BufferedReader(new InputStreamReader(System.in));

        while (true) {
            printf("> ");
            var orders = reader.readLine().split(" ");
            var argList = new String[orders.length - 1];
            System.arraycopy(orders, 1, argList, 0, orders.length - 1);
            if (command(orders[0], argList)) break;
        }

        System.exit(0);
    }

    private static boolean command(String order, String... args) throws IOException {
        boolean exit = false;
        switch (order) {
            case "":
                break;
            case "ls":
                refresh();
                for (var i = 0; i < socketBlocks.size(); i++) {
                    var socketBlock = socketBlocks.get(i);
                    printfln("%d %s %s", i, socketBlock.getSocket().getRemoteSocketAddress(), socketBlockMap.get(socketBlock).getSocketSocketState());
                }
                break;
            case "separate":
                if (args.length != 1) {
                    printfln("Unexpected arguments");
                } else {
                    refresh();
                    int[] i = {0};
                    Helper.separate(3, new FileInputStream(args[0]), () -> {
                        OutputStream stream = null;
                        try {
                            stream = socketBlocks.get(i[0]++).getOutputStream();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                        i[0] %= socketBlocks.size();
                        return stream;
                    });
                }
                break;
            case "sort":
                if (args.length != 1) {
                    printfln("Unexpected arguments");
                } else {
                    refresh();
                    for (var socketBlock : socketBlocks) {
                        sendOrder("START", socketBlock.getOutputStreamWriter());
                    }
                    isSending = true;
                    command("separate", args[0]);
                    for (var socketBlock : socketBlocks) {
                        sendOrder("END", socketBlock.getOutputStreamWriter());
                    }
                    isSending = false;
                }
                break;
            case "put":
                if (args.length != 2) {
                    printfln("Unexpected arguments");
                } else {
                    var fileName = args[0];
                    var socketBlock = socketBlocks.get(Integer.parseInt(args[1]));
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
            case "exit":
                exit = true;
                break;
            default:
                printfln("Unknown command");
                break;
        }

        return exit;
    }

    private static void sendOrder(String order, OutputStreamWriter writer) throws IOException {
        writer.write(order.concat("\n"));
        writer.flush();
    }

    private static void refresh() {
        if (isSending) return;
        socketBlocks.removeIf((socketBlock) -> {
            try {
                socketBlock.getSocket().sendUrgentData(0xFF);
            } catch (Exception e) {
                socketBlockMap.remove(socketBlock);
                return true;
            }
            return false;
        });
        for (SocketBlock socketBlock : socketBlocks) {
            socketBlockMap.replace(socketBlock, getState(socketBlock));
        }
    }

    private static NodeBlock getState(SocketBlock socketBlock) {
        try {
            sendOrder("STATE", socketBlock.getOutputStreamWriter());
            return (NodeBlock) socketBlock.getObjectInputStream().readObject();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private static void printf(String order, Object... args) {
        System.out.printf(order, args);
    }

    private static void printfln(String order, Object... args) {
        printf(order.concat("\n"), args);
    }
}
