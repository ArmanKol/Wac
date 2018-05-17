package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import nl.hu.v1wac.firstapp.model.Country;

public class CountryPostgresDaoImpl extends PostgresBaseDao implements CountryDao {
	@Override
	public boolean save(Country country) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Country> findAll() {
		List<Country> list = new ArrayList<Country>();
		Country ctry = null;
		
		try (Connection connection = super.getConnection()){
			Statement stmt = connection.createStatement();
			ResultSet resultset = stmt.executeQuery("select code, iso3, name, capital, continent, region, surfacearea, population, governmentform, latitude, longitude from country");
			
			while(resultset.next()) {
				ctry = new Country(resultset.getString("code"), resultset.getString("iso3"), resultset.getString("name"), resultset.getString("capital"), resultset.getString("continent"), resultset.getString("region"), resultset.getDouble("surfacearea"), resultset.getInt("population"), resultset.getString("governmentform"), resultset.getDouble("latitude"), resultset.getDouble("longitude"));
				list.add(ctry);
			}
			resultset.close();
			stmt.close();
		}catch(Exception e) {
			System.out.println(e);
		}
		return list;
	}

	@Override
	public Country findByCode(String code) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Country> find10LargestPopulations() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Country> find10LargstSurfaces() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean update(Country country) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean delete(Country country) {
		// TODO Auto-generated method stub
		return false;
	}

}
