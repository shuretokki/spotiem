/** @format */

export function contactTemplate() {
  return `
    <section class="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div class="w-full max-w-lg bg-[#181414] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h1 class="text-3xl font-bold text-[#57B660] mb-2 text-center">Contact Us</h1>
        <p class="text-white text-center mb-4">Have a question, feedback, or business inquiry? Fill out the form below and we'll get back to you soon!</p>
        <form id="contact-form" class="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Your Name" required class="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#57B660] transition-colors" />
          <input type="email" name="email" placeholder="Your Email" required class="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#57B660] transition-colors" />
          <textarea name="message" placeholder="Your Message" required rows="4" class="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#57B660] transition-colors"></textarea>
          <button type="submit" class="w-full py-3 bg-[#57B660] rounded-md text-[#181414] text-base font-bold hover:bg-[#4da555] transition-all">Send Message</button>
        </form>
        <div id="contact-success" class="hidden text-green-500 text-center font-semibold mt-2">Thank you! We'll be in touch soon.</div>
      </div>
    </section>
  `;
}

export function setupContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('contact-success');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    successMsg.classList.remove('hidden');
    setTimeout(() => successMsg.classList.add('hidden'), 4000);
  });
}
