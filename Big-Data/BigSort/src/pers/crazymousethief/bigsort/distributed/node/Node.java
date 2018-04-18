package pers.crazymousethief.bigsort.distributed.node;

import pers.crazymousethief.bigsort.distributed.SocketBlock;
import pers.crazymousethief.bigsort.io.BufferInputStream;
import pers.crazymousethief.bigsort.single.Single;

import java.io.IOException;
import java.net.Socket;

public class Node {
    private static NodeBlock nodeBlock;
    private static long splitSize = 5000;

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
                    System.out.println(data);
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
                                    Single.separate(splitSize, stream, nodeBlock.getId());
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
