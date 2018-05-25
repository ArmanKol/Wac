package nl.hu.v1wac.firstapp.model;

import java.util.List;

import nl.hu.v1wac.firstapp.persistence.CountryDao;
import nl.hu.v1wac.firstapp.persistence.CountryPostgresDaoImpl;

public class WorldService {
	private CountryDao countryDaoImpl = new CountryPostgresDaoImpl();
		
	public List<Country> getAllCountries() {
		return countryDaoImpl.findAll();
	}
	
	public List<Country> get10LargestPopulations() {
		return countryDaoImpl.find10LargestPopulations();
	}

	public List<Country> get10LargestSurfaces() {
		return countryDaoImpl.find10LargstSurfaces();
	}
	
	public Country getCountryByCode(String code) {
		return countryDaoImpl.findByCode(code);
	}
	
	public boolean deleteCountry(String code) {
		for(Country ctry : getAllCountries()) {
			if(ctry.getCode().equals(code)) {
				countryDaoImpl.delete(ctry);
				return true;
			}
		}
		return false;
	}
	
	public Country updateCountry(String code, String land, String hoofdstad, String regio, double oppvlakte, int inwoners) {
		for(Country ctry : getAllCountries()) {
			if(ctry.getCode().equals(code)) {
				ctry.setName(land);
				ctry.setCapital(hoofdstad);
				ctry.setRegion(regio);
				ctry.setSurface(oppvlakte);
				ctry.setPopulation(inwoners);
				
				countryDaoImpl.update(ctry);
				return ctry;
			}
		}
		return null;
	}
	
	public Country addCountry(String land, String landcode, String hoofdstad, String bestuurvorm,String regio, double oppervlakte, int inwoners) {
		for(Country ctry : getAllCountries()) {
			if(!(ctry.getName().equals(land) && ctry.getCapital().equals(hoofdstad))) {
				Country countryAdd = new Country(land, landcode, hoofdstad, bestuurvorm, regio, oppervlakte, inwoners);
				
				if(countryDaoImpl.save(countryAdd) == false) {
					return null;
				}else {
					countryDaoImpl.save(countryAdd);
					return countryAdd;
				}

			}
		}
		return null;
	}
}
