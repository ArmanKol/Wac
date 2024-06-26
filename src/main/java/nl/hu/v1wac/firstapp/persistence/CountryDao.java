package nl.hu.v1wac.firstapp.persistence;

import java.util.List;

import nl.hu.v1wac.firstapp.model.Country;

public interface CountryDao {
	public boolean save(Country country);
	public List<Country> findAll();
	public Country findByCode(String code);
	public List<Country> find10LargestPopulations();
	public List<Country> find10LargstSurfaces();
	public boolean update(Country country);
	public boolean delete(Country country);
}
