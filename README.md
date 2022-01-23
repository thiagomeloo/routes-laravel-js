# routes-laravel-js

## Table of Contents
  - [Description](#description)
  - [Installing](#installing)
  - [Example](#example)

## Description
  This package add routes laravel in views react.

## Installing

Using npm:

```bash
$ npm install routes-laravel-js
```

Prepare project laravel:

- make middleware
  ```php
  class RoutesLaravelJsMiddleware
  {
      public function handle(Request $request, Closure $next)
      {
          $routes = collect();

          foreach (Route::getRoutes()->getIterator() as $route) {
              $routes->push((object)[
                  'name' => $route->getName(),
                  'actionName' => $route->getActionName(),
                  'uri' => $route->uri,
                  'methods' => $route->methods,
                  'middleware' => $route->middleware(),
              ]);
          }
          $request->headers->set('X-Routes', $routes->toJson());

          return $next($request);
      }
  }

  ```

- add in middleware to kernel.php
  ```php
  protected $middleware = [
      RoutesLaravelJsMiddleware::class,
  ];
  ```

## Example

- add in app.blade.php
  ```php
    <meta name="x-routes" content="{{ app('request')->header('X-Routes', 'default_header_value') }}" />
  ```
- usage in component
  ```js
  import { Routes } from 'routes-laravel-js';

  export default function HomePage(props) {
      let routes = Routes.init();
      return (
          <div>
              <h1>Home Page</h1>
              <a href={routes.getUri('home')}>Home</a>
          </div>
      );
  }
  ```

