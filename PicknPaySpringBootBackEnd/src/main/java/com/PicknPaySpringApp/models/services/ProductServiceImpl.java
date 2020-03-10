package com.PicknPaySpringApp.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PicknPaySpringApp.models.dao.IProductDao;
import com.PicknPaySpringApp.models.entity.Product;

@Service
public class ProductServiceImpl implements IProductService{

	@Autowired
	private IProductDao productDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Product> findAll() {
		return (List<Product>) productDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Product findById(Long id) {
		return productDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Product save(Product product) {
		return productDao.save(product);
	}
	
	@Override
	@Transactional
	public void delete(Long id) {
	  productDao.deleteById(id);
	}

}
