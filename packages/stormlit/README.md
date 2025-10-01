# Stormlit

This pasckage contains components and utilities to help you build documentation sites with ease. It is designed to work seamlessly with Astro, providing a set of tools to enhance your documentation experience.

## Installation
```bash
npm install stormlit
```

## Example Usage

```mdx
---
import  { StmCol, StmTable } from 'stormlit';
import data from '../test.yaml';
---

<pre>
    <StmCol path="id" name="Employee ID" />
    <StmCol path="username" name="Name"  />
    <StmCol name="email" />
</pre>

<StmTable id="employee-data" data={data.users}>
    <StmCol path="id" name="Employee ID" />
    <StmCol path="username" name="Name"  />
    <StmCol name="email" />
</StmTable>

<a href="about">about</a>
```

For more detailed documentation, please refer to the [Stormlit Documentation](https://github.com/frodrish/stormlit#readme).