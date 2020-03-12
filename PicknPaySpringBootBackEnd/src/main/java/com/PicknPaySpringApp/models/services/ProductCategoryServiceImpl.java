package com.PicknPaySpringApp.models.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PicknPaySpringApp.models.dao.IProductCategoryDao;
import com.PicknPaySpringApp.models.entity.ProductCategory;

@Service
public class ProductCategoryServiceImpl implements IProductCategoryService{
	
	@Autowired
	IProductCategoryDao categoryDao; 
	
	@Override
	@Transactional
	public List<ProductCategory> findAll() {
		
		return (List<ProductCategory>) categoryDao.findAll();
	}
	
	@Override
	@Transactional
	public ProductCategory findByName(String name) {
		
		return categoryDao.findByName(name).orElse(null);
	}

	@Override
	public ProductCategory save(ProductCategory productCategory) {
		
		return categoryDao.save(productCategory);
	}
}
