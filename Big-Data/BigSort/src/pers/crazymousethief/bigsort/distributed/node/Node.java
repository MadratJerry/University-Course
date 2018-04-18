package pers.crazymousethief.bigsort.distributed.node;

import pers.crazymousethief.bigsort.distributed.SocketBlock;
import pers.crazymousethief.bigsort.io.BufferInputStream;
import pers.crazymousethief.bigsort.io.util.Helper;
import pers.crazymousethief.bigsort.single.Single;

import java.io.*;
import java.net.Socket;
import java.util.Vector;

public class Node {
    private static NodeBlock nodeBlock;
    private static long splitSize = 100000;
    private static int count;

    public static void main(String[] args) throws IOException {
        var socket = new Socket("localhost", 17325);
        var socketBlock = new SocketBlock(socket);
        var stream = new BufferInputStream();
        try (var reader = socketBlock.getBufferedReader();
             var writer = socketBlock.getBufferedWriter();
             var input = socketBlock.getObjectInputStream();
             var output = socketBlock.getObjectOutputStream()) {
            nodeBlock = (NodeBlock) socketBlock.getObjectInputStream().readObject();
            System.out.println("#" + nodeBlock.getId());
            while (true) {
                String data;
                while ((data = reader.readLine()) != null) {
                    switch (data) {
                        case "STATE":
                            output.writeObject(nodeBlock);
                            output.flush();
                            output.reset();
                            break;
                        case "START":
                            nodeBlock.setSocketState(NodeBlock.SocketState.RECEIVING);
                            new Thread(() -> {
                                try {
                                    count = Single.separate(splitSize, stream, nodeBlock.getId());
                                    nodeBlock.setSort(true);
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }).start();
                            break;
                        case "END":
                            stream.flush();
                            nodeBlock.setSocketState(NodeBlock.SocketState.FREE);
                            break;
                        case "GET":
                            var v = new Vector<InputStream>();
                            for (int i = 0; i < count; i++)
                                v.add(new FileInputStream(nodeBlock.getId() + "_" + i + ".txt"));
                            Helper.merge(v, socketBlock.getOutputStream());
                            socketBlock.getBufferedWriter().write("\n");
                            socketBlock.getBufferedWriter().flush();
                            System.out.println("MERGED");
                            break;
                        default:
                            if (nodeBlock.getSocketSocketState().equals(NodeBlock.SocketState.RECEIVING)) {
                                stream.write(data.concat("\n"));
                            }
                            break;
                    }
                }
                socket.sendUrgentData(0xff);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
