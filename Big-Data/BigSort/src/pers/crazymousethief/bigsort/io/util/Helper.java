package pers.crazymousethief.bigsort.io.util;

import java.io.*;
import java.util.Arrays;

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
            }
            while ((text = reader.readLine()) != null && ++index != splitSize);
            writer.flush();
        }
    }
}
