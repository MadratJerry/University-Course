package pers.crazymousethief.bigsort.distributed.node;

import java.io.*;
import java.net.Socket;

public class Node {
    private static final NodeBlock nodeBlock = new NodeBlock();

    public static void main(String[] args) throws IOException {
        var socket = new Socket("localhost", 17325);
        try (var reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             var writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
             var output = new ObjectOutputStream(socket.getOutputStream())) {
            while (true) {
                String data;
                while ((data = reader.readLine()) != null) {
                    System.out.println(data);
                    switch (data) {
                        case "STATE":
                            output.writeObject(nodeBlock);
                            output.flush();
                            break;
                        default:
                            System.out.println(data);
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
