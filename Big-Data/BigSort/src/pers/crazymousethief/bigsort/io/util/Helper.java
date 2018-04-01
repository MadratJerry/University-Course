package pers.crazymousethief.bigsort.io.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
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
}
