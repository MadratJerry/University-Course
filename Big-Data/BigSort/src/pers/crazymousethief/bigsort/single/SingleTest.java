package pers.crazymousethief.bigsort.single;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import pers.crazymousethief.bigsort.Generator;

import java.io.IOException;

class SingleTest {
    private static String fileName = "numbers.txt";
    private static int size = 10000000;

    @BeforeAll
    static void init() throws IOException {
        Generator.main(new String[]{"numbers.txt", size + ""});
    }

    @Test
    void separateTest() throws IOException {
        Single.separate(fileName, size / 10);
    }

    @Test
    void mergeTest() throws IOException {
        Single.merge("result.txt");
    }
}