<script>
    import { AppShell } from "@skeletonlabs/skeleton";
  </script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <AppShell>
    <slot />
    <svelte:fragment slot="pageFooter">
        <nav class="w-full p-5 lg:p-15 card !rounded-none grid grid-cols-2 lg:grid-cols-4">
          <div class="p-1 md:p-5 lg:p-10">
            <h4 class="h4">Contact information</h4>
            <br>
            <span><i class="fa fa-map-marker"></i>&nbsp;&nbsp;<a href="https://maps.app.goo.gl/idEzGhBPDR5H2WSe8" class="hover:anchor">Ritarikatu 2 B, Helsinki</a></span><br>
            <span><i class="fa fa-phone"></i>&nbsp;&nbsp;<a href="tel:+358 295 16001" class="hover:anchor">+358 295 16001</a></span><br>
            <span><i class="fa fa-envelope"></i>&nbsp;&nbsp;<a href="mailto:registry.vnk@gov.fi" class="hover:anchor">registry.vnk@gov.fi</a></span>
          </div>
          <div class="p-1 md:p-5 lg:p-10">
            <h4 class="h4">Quick Link</h4>
            <br>
            &#129170;&nbsp;&nbsp;<a href="/faq" class="hover:anchor">FAQ</a><br>
            &#129170;&nbsp;&nbsp;<a href="/about" class="hover:anchor">About Us</a><br>
            &#129170;&nbsp;&nbsp;<a href="/privacy-policy" class="hover:anchor">Privacy Policy</a><br>
            &#129170;&nbsp;&nbsp;<a href="/terms-conditions" class="hover:anchor">Terms and Conditions</a>
          </div>
        </nav>
      </svelte:fragment>
  </AppShell>
  
  
  