import{createClient}from'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/+esm';
const sb=createClient('https://otgubsvmcbaocrndngrq.supabase.co','sb_publishable__d50uWZVhfLcfzHv70ZOSA_QySE92AW',{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const form=document.querySelector('#authForm');
if(form){
  const original=form.onsubmit;
  form.onsubmit=async e=>{
    const signupFields=document.querySelector('#signupFields');
    const isSignup=signupFields&&signupFields.style.display!=='none';
    if(isSignup){return original?.call(form,e)}
    e.preventDefault();
    e.stopImmediatePropagation();
    const email=document.querySelector('#email')?.value.trim()||'';
    const password=document.querySelector('#password')?.value||'';
    const button=document.querySelector('#authSubmit');
    const message=document.querySelector('#authMessage');
    if(message){message.style.display='none';message.textContent=''}
    if(button){button.disabled=true;button.textContent='Connexion…'}
    try{
      const{error}=await sb.auth.signInWithPassword({email,password});
      if(error)throw error;
      const{data:isAdmin,error:adminError}=await sb.rpc('nightquiz_admin_is_super');
      if(adminError)throw adminError;
      if(isAdmin===true){location.replace('./admin.html');return}
      location.reload();
    }catch(error){
      if(message){message.textContent=error?.message||'Impossible de vous connecter.';message.style.display='block'}
      if(button){button.disabled=false;button.textContent='Se connecter'}
    }
  };
}
(async()=>{
  const{data:{session}}=await sb.auth.getSession();
  if(!session)return;
  const params=new URLSearchParams(location.search);
  if(params.get('play')==='1')return;
  const{data:isAdmin}=await sb.rpc('nightquiz_admin_is_super');
  if(isAdmin===true&&!location.pathname.endsWith('/admin.html')&&!location.pathname.endsWith('/admin-v2.html'))location.replace('./admin.html');
})();