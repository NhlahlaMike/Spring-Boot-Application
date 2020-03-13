import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '../_interfaces/product';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ProductService } from '../_services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  // For the FormControl - Adding products
  insertForm: FormGroup;
  // Id: FormControl;
  barcode: FormControl;
  productName: FormControl;
  productDescription: FormControl;
  imageUrl: FormControl;
  productType: FormControl;
  price: FormControl;
  quantity: FormControl;
  features: FormControl;
  productUsage: FormControl;
  outOfStock: FormControl;
  billingAddress: FormControl;
  tc: FormControl;
  sellerId: FormControl;
  sellerName: FormControl;

  // Updating the Product
  updateForm: FormGroup;
  // tslint:disable-next-line:variable-name
  _id: FormControl;
  // tslint:disable-next-line:variable-name
  _barcode: FormControl;
  // tslint:disable-next-line:variable-name
  _productName: FormControl;
  // tslint:disable-next-line:variable-name
  _productDescription: FormControl;
  // tslint:disable-next-line:variable-name
  _imageUrl: FormControl;
  // tslint:disable-next-line:variable-name
  _productType: FormControl;
  // tslint:disable-next-line:variable-name
  _price: FormControl;
  // tslint:disable-next-line:variable-name
  _quantity: FormControl;
  // tslint:disable-next-line:variable-name
  _features: FormControl;
  // tslint:disable-next-line:variable-name
  _productUsage: FormControl;
  // tslint:disable-next-line:variable-name
  _outOfStock: FormControl;
  // tslint:disable-next-line:variable-name
  _billingAddress: FormControl;
  // tslint:disable-next-line:variable-name
  _tc: FormControl;
  // tslint:disable-next-line:variable-name
  _sellerId: FormControl;
  // tslint:disable-next-line:variable-name
  _sellerName: FormControl;

  // Datatables Properties
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  // Add Modal @ViewChild target tamplate in html by its reference
  @ViewChild('addTemplate', { static: false }) addmodal: TemplateRef<any>;
  // Update Modal
  @ViewChild('editTemplate', { static: false }) editmodal: TemplateRef<any>;

  // Modal properties
  modalMessage: string;
  modalRef: BsModalRef;
  selectedProduct: Product;
  products$: Observable<Product[]>;
  products: Product[] = [];
  userRoleStatus: string;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private modalService: BsModalService,
              private productService: ProductService,
              private chRef: ChangeDetectorRef) { }

  ngOnInit() {

    // datatable initialization
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
      order: [[0, 'asc']]
    };

    this.products$ = this.productService.getProducts();
    this.products$.subscribe(
      res => {
            console.log(res);
            this.products = res;
            this.chRef.detectChanges();
            this.dtTrigger.next();
      },
      error => {

      }
      );


    // insert products validation
    this.barcode = new FormControl('', [Validators.required]);
    this.productName = new FormControl('', [Validators.required]);
    this.productDescription = new FormControl('', [Validators.required]);
    this.imageUrl = new FormControl('', [Validators.required]);
    this.productType = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this.quantity = new FormControl('', [Validators.required]);
    this.features = new FormControl('', [Validators.required]);
    this.productUsage = new FormControl('', [Validators.required]);
    this.outOfStock = new FormControl(null, [Validators.required]);
    this.billingAddress = new FormControl('', [Validators.required]);
    this.tc = new FormControl('', [Validators.required]);
    this.sellerId = new FormControl();
    this.sellerName = new FormControl();

    this.insertForm = this.fb.group({
      barcode: this.barcode,
      productName: this.productName,
      productDescription: this.productDescription,
      imageUrl: this.imageUrl,
      productType: this.productType,
      price: this.price,
      quantity: this.quantity,
      features: this.features,
      productUsage: this.productUsage,
      outOfStock: this.outOfStock,
      billingAddress: this.billingAddress,
      tc: this.tc,
      sellerId: this.sellerId,
      sellerName: this.sellerName
    });

    // update products validation
    this._id = new FormControl();
    this._barcode = new FormControl('', [Validators.required]);
    this._productName = new FormControl('', [Validators.required]);
    this._productDescription = new FormControl('', [Validators.required]);
    this._imageUrl = new FormControl('', [Validators.required]);
    this._productType = new FormControl('', [Validators.required]);
    this._price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this._quantity = new FormControl('', [Validators.required]);
    this._features = new FormControl('', [Validators.required]);
    this._productUsage = new FormControl('', [Validators.required]);
    this._outOfStock = new FormControl(null, [Validators.required]);
    this._billingAddress = new FormControl('', [Validators.required]);
    this._tc = new FormControl('', [Validators.required]);
    this._sellerId = new FormControl();
    this._sellerName = new FormControl();

    this.updateForm = this.fb.group({
      id: this._id.value,
      barcode: this._barcode.value,
      productName: this._productName.value,
      productDescription: this._productDescription.value,
      imageUrl: this._imageUrl.value,
      productType: this._productType.value,
      price: this._price.value,
      quantity: this._quantity.value,
      features: this._features.value,
      productUsage: this._productUsage.value,
      outOfStock: this._outOfStock.value,
      billingAddress: this._billingAddress.value,
      tc: this._tc.value,
      sellerId: this._sellerId.value,
      sellerName: this._sellerName.value
    });

  }
  onAddProduct() {
    this.modalRef = this.modalService.show(this.addmodal);
    this.modalRef.setClass('modal-lg');
  }

  onSubmit() {
    const newProduct = this.insertForm.value;
    console.log(newProduct);
    this.productService.createProduct(newProduct).subscribe(
      res => {
        this.insertForm.reset();
        this.modalRef.hide();
        this.rerender();
        this.toastr.success('Product Added', 'Product Added successfully!');
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed adding product'
        });
      }
    );
  }
  onUpdateModal(productEdit: Product) {

    // update products validation
    this._id.setValue(productEdit.id);
    this._barcode.setValue(productEdit.barcode);
    this._productName.setValue(productEdit.productName);
    this._productDescription.setValue(productEdit.productDescription);
    this._imageUrl.setValue(productEdit.imageUrl);
    this._productType.setValue(productEdit.productType);
    this._price.setValue(productEdit.price);
    this._quantity.setValue(productEdit.quantity);
    this._features.setValue(productEdit.features);
    this._productUsage.setValue(productEdit.productUsage);
    this._outOfStock.setValue(productEdit.outOfStock);
    this._billingAddress.setValue(productEdit.billingAddress);
    this._tc.setValue(productEdit.tc);
    this._sellerId.setValue(productEdit.sellerId);
    this._sellerName.setValue(productEdit.sellerName);

    this.updateForm = this.fb.group({
      id: this._id,
      barcode: this._barcode,
      productName: this._productName,
      productDescription: this._productDescription,
      imageUrl: this._imageUrl,
      productType: this._productType,
      price: this._price,
      quantity: this._quantity,
      features: this._features,
      productUsage: this._productUsage,
      outOfStock: this._outOfStock,
      billingAddress: this._billingAddress,
      tc: this._tc,
      sellerId: this._sellerId,
      sellerName: this._sellerName
    });

    this.modalRef = this.modalService.show(this.editmodal);
    this.modalRef.setClass('modal-lg');
  }

  onUpdate() {
    const editProduct = this.updateForm.value;
    console.log(editProduct);
    this.productService.updateProduct(editProduct.id, editProduct).subscribe(
      res => {
        this.productService.clearCache();
        this.products$ = this.productService.getProducts();
        this.products$.subscribe(updatedlist => {
        this.products = updatedlist;
        this.toastr.success('Product Updated', 'Product Updated successful.');
        this.modalRef.hide();
        this.rerender();
        });
      },
      error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed adding product'
        });
      }
    );
  }

  onDelete(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(
      res => {
        this.productService.clearCache();
        this.products$ = this.productService.getProducts();
        this.products$.subscribe(
          newList => {
            this.products = newList;
            this.toastr.success('Product Deleted', 'Product Deleted successful.');
            this.rerender();
          }
        )

      }
    )
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first in the current context
      dtInstance.destroy();

      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
  }

}

