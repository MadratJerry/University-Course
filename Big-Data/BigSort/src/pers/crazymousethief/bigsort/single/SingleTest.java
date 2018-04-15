package pers.crazymousethief.bigsort.single;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import pers.crazymousethief.bigsort.Generator;
import pers.crazymousethief.bigsort.io.util.Helper;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

class SingleTest {
    private static String fileName = "numbers.txt";
    private static int size = 10000000;

    @BeforeAll
    static void init() throws IOException {
        Generator.main(new String[]{"numbers.txt", size + ""});
    }

    @Test
    void mergeTest() throws IOException {
        Single.merge("result.txt");
    }
}