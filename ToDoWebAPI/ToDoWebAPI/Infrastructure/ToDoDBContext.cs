using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ToDoWebAPI.Models
{
    public class ToDoDBContext : DbContext
    {
        public ToDoDBContext() : base("VSTDA")
        {

        }

        public System.Data.Entity.DbSet<ToDoWebAPI.Models.ToDoModel> ToDoModels { get; set; }
    }
}