package pers.crazymousethief.bigsort.io.util;

import pers.crazymousethief.bigsort.io.OrderedInputStream;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Vector;

public class Helper {

    public static String convertStreamToString(InputStream stream) throws IOException {
        StringBuilder sb;
        try (var s = new BufferedReader(new InputStreamReader(stream))) {
            String number;
            sb = new StringBuilder();
            while ((number = s.readLine()) != null) {
                sb.append(number).append("\n");
            }
        }
        return sb.toString();
    }

    public static int[] getRandomOrderedArray(int size) {
        int[] a = new int[size];
        for (int i = 0; i < a.length; i++) a[i] = (int) (Math.random() * Integer.MAX_VALUE);
        Arrays.sort(a);
        return a;
    }

    public static String convertArrayToString(int[] a) {
        var sb = new StringBuilder();
        for (var number : a)
            sb.append(number).append("\n");
        return sb.toString();
    }

    public static BufferedReader getBufferedReader(InputStream stream) {
        return new BufferedReader(new InputStreamReader(stream));
    }

    public static BufferedWriter getBufferedWriter(OutputStream stream) {
        return new BufferedWriter(new OutputStreamWriter(stream));
    }

    public static void separate(long splitSize, InputStream stream, Infinite<OutputStream> infinite) throws IOException {
        var itr = new InfiniteIterator<OutputStream>(infinite);
        var reader = Helper.getBufferedReader(stream);
        String text = reader.readLine();
        while (itr.hasNext()) {
            if (text == null) break;
            int index = 0;
            var writer = Helper.getBufferedWriter(itr.next());
            do {
                writer.write(text.concat("\n"));
            } while ((text = reader.readLine()) != null && ++index != splitSize);
            writer.flush();
        }
    }

    public static BufferedWriter getFileWriter(String fileName) throws IOException {
        return new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), StandardCharsets.UTF_8));
    }

    public static void inputStreamToWriter(InputStream stream, BufferedWriter writer) throws IOException {
        try (var reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8))) {
            String text;
            while ((text = reader.readLine()) != null) {
                writer.write(text.concat("\n"));
            }
            writer.flush();
        }
    }

    public static void merge(Vector<InputStream> v, OutputStream stream) throws IOException {
        var writer = Helper.getBufferedWriter(stream);
        Helper.inputStreamToWriter(new OrderedInputStream(v), writer);
    }
}
