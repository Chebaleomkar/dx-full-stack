# TODO

- [x] work on useUser(); => gives the userData and calls the api single time and store the cache in session storage
- [x] work mobileNav(); => userProfile();
- try to implement the middleware 
- [x] Do home page static site generate (SSG)
- [ ] identify where we can do SSR and implement
- [ ] Secure the /api route and move the post api's to hono js . Except the AddFine api : /api/fine/add only for security reason (No one could add student or teacher or institution)



#### setting pag

 -zoom in zoom out text
 -dark & light mode
 -custom themes (colors if possible image) NOte : only works in light mode
 -help

### BUG 

 - addfine.tsx : 
      - [x] if user select checkbox then make the reason and amount input as readonly 
      - [] add check the custom reason is not already present in checkbox then allow the fine



##### MUST FOCUS

  - [ ] Do typescript at NavItems component
  - [ ] In sidebar onClick on Link should close the sidebar

#### Fine Report
 - [x] by dropdown [year ,month , Fortnight , week , today ]
 - [x]studentId , student_name , Reason , amount , issuedBy date&time


###### code splitted

- share/profile.tsx