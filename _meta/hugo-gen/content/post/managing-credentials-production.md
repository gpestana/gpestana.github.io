---
title: "Managing credentials in production"
date: '2017-08-20'
tags:
  - devops
  - best-practices
slug: managing-production-credentials
draft: false
---


<p>Every software must deal and manage credentials at some point. I will define credentials in the context of this article as secrets that must be protected at all costs, under risk of seriously compromising the security of production systems. There are several points to have in mind when managing credentials of productions systems:</p>

<p><strong>Credentials storage should be kept secret by encryption and a strong access management.</strong>
Credentials must never be transported but stored. Never send credentials over email or any other means. Store the credentials and protect them with a strong and auditable access management. Any person or system who wants to access credentials must know where and how to get the credentials from and prove its identity.</p>

<p><strong>Credentials database must be regularly backed up and easily restored.</strong> For obvious reasons. The backup must be explicitly and automatically updated when there is credential revocation.</p>

<p><strong>Credentials revocation should be fast.</strong> This is important to swiftly respond when credentials are compromised.</p>

<p><strong>Credentials must have a single purpose and protect a limited domain.</strong> This means that you should not use the same credential to protect different systems or domains, decreasing the danger when a credential is compromised. It is better to have multiple credentials for different domains and have an easy system to manage credentials than using few master credentials. Putting all eggs in one basket is too risky when it comes to credentials.</p>

<p><strong>Credentials must never, ever, be stored on a general purpose version control systems (VCS).</strong> Even if the VCS is private, it is hard to ensure that in the long run the current and old credentials are not accessible by people who should not. Some forget that ultimately, the VCS never forget and it&rsquo;s easily searchable. It is obvious that you should be extra careful with pushing credentials upstream to public repositories, but still we witness a bunch of credentials being compromised everyday in GitHub.</p>

<h2 id="in-practice">In practice</h2>

<p>Although it may seem complex to setup a credential management system which respects all the principles mentioned above, there are open source projects which will make our life easier. <a href="https://www.consul.io/">Consul</a> and <a href="https://vaultproject.io">Vault</a> by Hashicorp can be easily deployed as part of a credential management system which respects all the principles mentioned. In another post we’ll see how store and manage production credentials in a secure and usable way.</p>

<p><a href="https://news.ycombinator.com/item?id=15109637">Comments and discussion</a></p>
