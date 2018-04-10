package pers.crazymousethief.bigsort.distributed.proxy;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Proxy {
    private static int id = 0;
    private static final Map<Thread, ProxyThread> threadMap = new HashMap<>();
    private static final ArrayList<Thread> threads = new ArrayList<>();

    public static void main(String[] args) throws IOException {
        new Thread(() -> {
            try (var server = new ServerSocket(17325)) {
                int id = 0;
                while (true) {
                    Socket socket = server.accept();
                    System.out.println("Start " + id);
                    var thread = new Thread(new ProxyThread(socket));
                    threads.add(thread);
                    thread.start();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
        var reader = new BufferedReader(new InputStreamReader(System.in));
        while (true) {
            var str = reader.readLine();
            switch (str) {
                case "ls":
                    threads.removeIf(thread -> {
                        if (!thread.isAlive()) threadMap.remove(thread);
                        return !thread.isAlive();
                    });
                    for (var thread : threads) {
                        System.out.println(thread.getName());
                    }
                    break;
                default:
                    System.out.println("Unknown command");
                    break;
            }
        }
    }

    private static class ProxyThread implements Runnable {
        private Socket socket;
        private Thread thread;

        ProxyThread(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            thread = Thread.currentThread();
            threadMap.put(thread, this);
            try (var reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                 var writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()))
            ) {
                String line = null;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
