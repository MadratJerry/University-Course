package base;

import utils.Database;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public abstract class Model {
    protected static <T> List<T> query(Class<T> classObject, String sql, Object... paramsValue) {
        List<T> list = new ArrayList<>();
        try {
            Connection connection = Database.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            for (int i = 0; i < paramsValue.length; i++) {
                preparedStatement.setObject(i + 1, paramsValue[i]);
            }
            ResultSet resultSet = preparedStatement.executeQuery();
            ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
            while (resultSet.next()) {
                T result = classObject.getDeclaredConstructor().newInstance();
                for (int i = 0; i < resultSetMetaData.getColumnCount(); i++) {
                    String columnName = resultSetMetaData.getColumnName(i + 1);
                    Object value = resultSet.getObject(columnName);
                    Field field = classObject.getDeclaredField(columnName);
                    field.setAccessible(true);
                    field.set(result, value);
                }
                list.add(result);
            }
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SQLException | ClassNotFoundException | NoSuchFieldException e) {
            e.printStackTrace();
        }
        return list;
    }

    public static boolean update(Class<?> classObject, String sql, Object... paramsValue) {
        try {
            Connection connection = Database.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            for (int i = 0; i < paramsValue.length; i++)
                preparedStatement.setObject(i + 1, paramsValue[i]);
            preparedStatement.executeUpdate();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    protected static <T> T findOneById(Class<T> classObject, String id) {
        String name = classObject.getSimpleName().split("Bean")[0].toLowerCase();
        List<T> list = query(classObject, String.format("SELECT * FROM %s WHERE %sId = ?", name, name), id);
        return list.isEmpty() ? null : list.get(0);
    }

    protected static <T> boolean deleteOneById(Class<T> classObject, String id) {
        if (findOneById(classObject, id) != null) {
            String name = classObject.getSimpleName().split("Bean")[0].toLowerCase();
            update(classObject, String.format("DELETE FROM %s WHERE %sId = ?", name, name), id);
            return true;
        } else {
            return false;
        }
    }

    protected static <T> boolean insertOne(Class<T> classObject, T bean) {
        String name = classObject.getSimpleName().split("Bean")[0].toLowerCase();
        ArrayList<Field> columnList = new ArrayList<>(Arrays.asList(classObject.getDeclaredFields()));
        Object[] params = columnList.stream().map((f) -> {
            try {
                return new PropertyDescriptor(f.getName(), classObject).getReadMethod().invoke(bean);
            } catch (IllegalAccessException | IntrospectionException | InvocationTargetException e) {
                e.printStackTrace();
            }
            return null;
        }).toArray();
        return update(classObject, String.format("INSERT INTO %s (%s) VALUES (%s)", name,
                columnList.stream().map(Field::getName).collect(Collectors.joining(", ")),
                columnList.stream().map((s) -> "?").collect(Collectors.joining(", "))), params);
    }
}
