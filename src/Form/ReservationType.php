<?php

namespace App\Form;

use App\Entity\Reservation;
use App\Form\DataTransformer\StringToDateTimeTransformer;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Bundle\SecurityBundle\Security;


class ReservationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom', TextType::class)
            ->add("nbCouvert", NumberType::class)
            ->add('date', DateType::class, [
                'widget' => 'single_text',
            ])
            ->add('allergie', TextType::class)
            ->add('heure', TextType::class)
            ->get('heure')
            ->addModelTransformer(new StringToDateTimeTransformer('H:i'))
            
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Reservation::class,
            'csrf_protection' => false,
            'csrf_field_name' => '_token',
            'csrf_token_id'   => 'post_item',
        ]);
    }
}
