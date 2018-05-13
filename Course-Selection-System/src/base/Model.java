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
    public Model() {
    }

    public <T extends Model> List<T> query(String sql, Object... params) {
        List<T> list = new ArrayList<>();
        try {
            Connection connection = Database.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql);
            for (int i = 0; i < params.length; i++) statement.setObject(i + 1, params[i]);
            ResultSet resultSet = statement.executeQuery();
            ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
            while (resultSet.next()) {
                @SuppressWarnings("unchecked")
                T result = (T) this.getClass().getDeclaredConstructor().newInstance();
                for (int i = 0; i < resultSetMetaData.getColumnCount(); i++) {
                    String columnName = resultSetMetaData.getColumnName(i + 1);
                    Object value = resultSet.getObject(columnName);
                    Field field = this.getClass().getDeclaredField(columnName);
                    field.setAccessible(true);
                    field.set(result, value);
                }
                list.add(result);
            }
        } catch (ClassNotFoundException | SQLException | IllegalAccessException | InstantiationException | NoSuchMethodException | InvocationTargetException | NoSuchFieldException e) {
            e.printStackTrace();
        }
        return list;
    }

    public int update(String sql, Object... paramsValue) {
        int count;
        try {
            Connection connection = Database.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            for (int i = 0; i < paramsValue.length; i++)
                preparedStatement.setObject(i + 1, paramsValue[i]);
            count = preparedStatement.executeUpdate();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            return 0;
        }
        return count;
    }

    public <T extends Model> boolean updateOneById(String id, T bean) {
        String name = this.getClass().getSimpleName().toLowerCase();
        ArrayList<Object> params = new ArrayList<>();
        ArrayList<Field> columnList = new ArrayList<>(Arrays.asList(this.getClass().getDeclaredFields()));
        columnList.removeIf((f) -> {
            try {
                Object param = new PropertyDescriptor(f.getName(), this.getClass()).getReadMethod().invoke(bean);
                if (param == null) {
                    return true;
                } else {
                    params.add(param);
                    return false;
                }
            } catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
                e.printStackTrace();
                return true;
            }
        });
        params.add(id);
        return update(String.format("UPDATE %s SET %s WHERE %sId = ?", name,
                columnList.stream().map((c) -> c.getName() + " = ?").collect(Collectors.joining(",")), name),
                params.toArray()) != 0;
    }

    public <T extends Model> T findOneById(String id) {
        String name = this.getClass().getSimpleName().toLowerCase();
        List<T> list = query(String.format("SELECT * FROM %s WHERE %sId = ?", name, name), id);
        return list.isEmpty() ? null : list.get(0);
    }

    public boolean deleteOneById(String id) {
        if (findOneById(id) != null) {
            String name = this.getClass().getSimpleName().toLowerCase();
            return update(String.format("DELETE FROM %s WHERE %sId = ?", name, name), id) != 0;
        } else {
            return false;
        }
    }

    public <T extends Model> boolean insertOne(T bean) {
        String name = this.getClass().getSimpleName().toLowerCase();
        ArrayList<Field> columnList = new ArrayList<>(Arrays.asList(this.getClass().getDeclaredFields()));
        Object[] params = columnList.stream().map((f) -> {
            try {
                return new PropertyDescriptor(f.getName(), this.getClass()).getReadMethod().invoke(bean);
            } catch (IllegalAccessException | IntrospectionException | InvocationTargetException e) {
                e.printStackTrace();
            }
            return null;
        }).toArray();
        return update(String.format("INSERT INTO %s (%s) VALUES (%s)", name,
                columnList.stream().map(Field::getName).collect(Collectors.joining(", ")),
                columnList.stream().map((s) -> "?").collect(Collectors.joining(", "))), params) != 0;
    }
}
