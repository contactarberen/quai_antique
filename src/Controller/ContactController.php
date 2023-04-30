<?php

namespace App\Controller;

use App\Repository\HoraireRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact')]
    public function index(HoraireRepository $horaireRepository): Response
    {
        return $this->render('contact/index.html.twig', [
            'horaires' => $horaireRepository->findAll(),
        ]);
    }
}
