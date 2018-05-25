package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class UserPostgresDaoImpl extends PostgresBaseDao implements UserDao {

	@Override
	public String findRoleForUser(String name, String pass) {
		String rol = "";
		
		try(Connection connection = super.getConnection()){
			Statement stmt = connection.createStatement();
			ResultSet resultset = stmt.executeQuery("select * from useraccount");
			
			while(resultset.next()) {
				if(name.equals(resultset.getString("username")) && pass.equals(resultset.getString("password"))){
					rol += resultset.getString("role");
					System.out.println(name);
					System.out.println(resultset.getString("username"));
					return rol;
				}
			}
		
		}catch(Exception e) {
			System.out.println(e);
		}
		return null;
	}

}
