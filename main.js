(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  var accessForm = document.getElementById('accessForm');
  var formNote = document.getElementById('formNote');
  if (accessForm && formNote) {
    accessForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      var submitButton = accessForm.querySelector('button[type="submit"]');
      var originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      formNote.hidden = true;
      formNote.classList.remove('is-error');

      try {
        var response = await fetch(accessForm.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(accessForm)
        });
        var result = await response.json();

        if (!response.ok || result.success === false) {
          throw new Error('The request could not be sent.');
        }

        accessForm.reset();
        formNote.textContent = 'Thanks! Your request has been sent. We’ll be in touch soon.';
        formNote.hidden = false;
      } catch (error) {
        formNote.textContent = 'We couldn’t send your request. Please email support@clearelay.com.';
        formNote.classList.add('is-error');
        formNote.hidden = false;
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }
})();
