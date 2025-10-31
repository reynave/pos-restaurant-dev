import { ActivatedRoute, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const paymentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 
   const activeRouter = inject(ActivatedRoute); 
  // cara dapetkan id dari query params ?id=123
  const id = activeRouter.snapshot.queryParams['id'];
  const cartId = localStorage.getItem('pos3.id'); // Periksa token di localStorage
  console.log('paymentGuard', cartId, id);
  if (cartId != null ) {
    if(cartId == id){
      return true; // Jika token ada dan sesuai, izinkan akses
    }else{
      router.navigate(['/error']); // Jika token tidak sesuai, arahkan ke halaman error
      return false;
    } 
  } else {
    router.navigate(['/error']); // Jika token tidak ada, arahkan ke halaman error
    return false;
  }
};
