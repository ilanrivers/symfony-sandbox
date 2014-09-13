<?php

namespace W4Y\Bundle\AngularJsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('W4YAngularJsBundle:Default:index.html.twig');
    }
}