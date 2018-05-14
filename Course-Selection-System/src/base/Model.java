package base;

import utils.Database;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public abstract class Model {
    public Model() {
    }

    public <T extends Model> List<T> query(String sql, Object... params)  {
        List<T> list = new ArrayList<>();
        try(Connection connection = Database.getConnection()) {
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
        HashMap<Field, Object> map = getKVMap(bean);
        List<Object> params = new ArrayList<>(map.values());
        params.add(id);
        return update(
                String.format("UPDATE %s SET %s WHERE %sId = ?",
                        name,
                        map.keySet().stream().map((c) -> c.getName() + " = ?").collect(Collectors.joining(",")),
                        name),
                params.toArray()) != 0;
    }

    public <T extends Model> List<T> findAll() {
        return query(String.format("SELECT * FROM %s", this.getClass().getSimpleName().toLowerCase()));
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
        HashMap<Field, Object> map = getKVMap(bean);
        return update(String.format("INSERT INTO %s (%s) VALUES (%s)", name,
                map.keySet().stream().map(Field::getName).collect(Collectors.joining(", ")),
                map.keySet().stream().map((s) -> "?").collect(Collectors.joining(", "))),
                map.values().toArray()) != 0;
    }

    private <T extends Model> HashMap<Field, Object> getKVMap(T bean) {
        HashMap<Field, Object> map = new HashMap<>();
        for (Field f : this.getClass().getDeclaredFields()) {
            try {
                Object param = new PropertyDescriptor(f.getName(), this.getClass()).getReadMethod().invoke(bean);
                if (param != null)
                    map.put(f, param);
            } catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
                e.printStackTrace();
            }
        }
        return map;
    }
}
