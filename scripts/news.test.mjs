import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNews, NEWS_SOURCES } from '../src/lib/news.ts';

test('RSS accepts attributed HTTPS publisher links and rejects off-domain links', () => {
  const entries = ['https://openai.com/news/example', 'https://openai.com.evil.test/fake', 'javascript:alert(1)'].map(link => `<item><title>AI research</title><link>${link}</link><pubDate>Tue, 15 Sep 2026 10:00:00 GMT</pubDate></item>`).join('');
  const result = parseNews(`<rss><channel>${entries}</channel></rss>`, NEWS_SOURCES[0]);
  assert.equal(result.length, 1);
  assert.equal(result[0].publisher, 'OpenAI');
});

test('NVIDIA Atom preserves title, alternate link and publication time', () => {
  const xml = '<feed><entry><title type="html"><![CDATA[Models &amp; inference]]></title><link rel="alternate" href="https://developer.nvidia.com/blog/example/"/><published>2026-09-15T10:00:00Z</published></entry></feed>';
  const result = parseNews(xml, NEWS_SOURCES[1]);
  assert.equal(result.length, 1);
  assert.equal(result[0].url, 'https://developer.nvidia.com/blog/example/');
  assert.equal(result[0].publishedAt, '2026-09-15T10:00:00.000Z');
});

test('XML entity declarations and malformed timestamps cannot become headlines', () => {
  assert.throws(() => parseNews('<!DOCTYPE rss><rss/>', NEWS_SOURCES[0]));
  assert.deepEqual(parseNews('<rss><channel><item><title>AI</title><link>https://openai.com/news/a</link><pubDate>invalid</pubDate></item></channel></rss>', NEWS_SOURCES[0]), []);
});
