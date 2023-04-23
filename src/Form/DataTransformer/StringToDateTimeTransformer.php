<?php

namespace App\Form\DataTransformer;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Symfony\Component\Validator\Constraints\DateTime;

class StringToDateTimeTransformer implements DataTransformerInterface
{
    private $format;

    public function __construct(string $format = 'H:i')
    {
        $this->format = $format;
    }

    public function transform($value)
    {
        if (null === $value) {
            return '';
        }

        if (!$value instanceof \DateTimeInterface) {
            throw new TransformationFailedException(sprintf('Expected a \DateTimeInterface object, "%s" given.', gettype($value)));
        }

        return $value->format($this->format);
    }

    public function reverseTransform($value)
    {
        if (empty($value)) {
            return null;
        }

        $dateTime = \DateTime::createFromFormat($this->format, $value);

        if (!$dateTime) {
            throw new TransformationFailedException(sprintf('The string "%s" could not be transformed into a valid DateTime object.', $value));
        }

        return $dateTime;
    }
}
