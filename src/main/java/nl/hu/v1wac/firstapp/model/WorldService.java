package nl.hu.v1wac.firstapp.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import nl.hu.v1wac.firstapp.persistence.CountryPostgresDaoImpl;

public class WorldService {
	private List<Country> allCountries = new ArrayList<Country>();
	private CountryPostgresDaoImpl countryDao;
	
	public WorldService() {
		
	}
	
	public List<Country> getAllCountries() {
		return countryDao.findAll();
	}
	
	public List<Country> get10LargestPopulations() {
		Collections.sort(allCountries, new Comparator<Country>() {
			public int compare(Country c1, Country c2) {
				return c2.getPopulation() - c1.getPopulation();
			};
		});
		
		return allCountries.subList(0, 10);
	}

	public List<Country> get10LargestSurfaces() {
		Collections.sort(allCountries, new Comparator<Country>() {
			public int compare(Country c1, Country c2) {
				return (int)(c2.getSurface() - c1.getSurface());
			};
		});
		
		return allCountries.subList(0, 10);
	}
	
	public Country getCountryByCode(String code) {
		Country result = null;
		
		for (Country c : allCountries) {
			if (c.getCode().equals(code)) {
				result = c;
				break;
			}
		}
		
		return result;
	}
}
