export const getRoomId = (userId = 0) => {
  // Generate a unique ID by multiplying a random decimal by a large integer,
  // convert to base 36 (numbers + letters), and attach user's ID to the front.
  // These room IDs are cleared once the last person leaves, so attaching the
  // the user ID to the room ID is just a precaution to avoid duplicates.
  return userId + Math.round(Math.random() * 36 ** 12).toString(36);
};

export const linkify = text => {
  const urls = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim; // `http://`, `https://`, `ftp://`
  const pseudoUrls = /(^|[^\/])(www\.[\S]+(\b|$))/gim; // `www.` by itself
  const emails = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

  return text
    .replace(urls, '<a href="$&">$&</a>')
    .replace(pseudoUrls, '$1<a href="https://$2">$2</a>')
    .replace(emails, '<a href="mailto:$&">$&</a>');
};

export const slugify = text => {
  const a = `àáäâèéëêìíïîòóöôùúüûñ`;
  const b = `aaaaeeeeiiiioooouuuun`;
  const p = new RegExp(a.split('').join('|'), 'g');

  return text
    .toString()
    .toLowerCase()
    .replace(/<[^>]+>/gi, '') // replace HTML tags
    .replace(p, c => b.charAt(a.indexOf(c))) // replace special characters
    .replace(/&/g, 'and') // replace & with 'and'
    .replace(/[^\w\s-]+/g, '-') // replace non-word chars, spaces with dash
    .replace(/ +/g, '-') // replace multiple spaces with dash
    .replace(/-{2,}/g, '-') // replace multiple dashes with single dash
    .replace(/^-+|-+$/g, ''); // remove leading and trailing dash
};

export const arrayToSentence = arr => {
  const last = arr.pop();
  return `${arr.join(', ')}, and ${last}`;
};
