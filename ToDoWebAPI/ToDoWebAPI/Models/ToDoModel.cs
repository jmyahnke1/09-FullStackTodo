using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ToDoWebAPI.Models
{
    public class ToDoModel
    {
        [Key]
        public int KeyId { get; set; }
        public string ToDoText { get; set; }
        public int Priority { get; set; }
        public DateTime CreationDate { get; set; }
    }
}